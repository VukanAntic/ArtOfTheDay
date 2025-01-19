import os
import json
import random
from pprint import pprint
import requests
import time

from sqlalchemy import create_engine, Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker
import sqlalchemy.orm
from sqlalchemy.dialects.postgresql import insert


Base = sqlalchemy.orm.declarative_base()

artwork_genre_association = Table(
    'artwork_genre', Base.metadata,
    Column('artwork_id', Integer, ForeignKey('artworks.id')),
    Column('genre_id', String(20), ForeignKey('genres.id'))
)


class Artwork(Base):
    __tablename__ = 'artworks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    date_display = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    path_to_artwork = Column(String(255), nullable=False)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=False)

    # Relationships
    genres = relationship('Genre', secondary=artwork_genre_association, back_populates='artworks')
    artist = relationship('Artist', back_populates='artworks')

class Artist(Base):
    __tablename__ = 'artists'

    id = Column(Integer, primary_key=True, autoincrement=True)
    # Unknown artist!
    name = Column(String(255), nullable=True)

    artworks = relationship('Artwork', back_populates='artist')

class Genre(Base):
    __tablename__ = 'genres'

    id = Column(String(20), primary_key=True)
    name = Column(String(255), nullable=False)

    # Define the relationship to Artwork
    artworks = relationship('Artwork', secondary=artwork_genre_association, back_populates='genres')



def check_if_path_is_invalid(path) :
    response = requests.get(path)
    print(path)
    print(response.status_code)

    if response.status_code == 429:
        print("Too many requests in a short period of time, need to cool off...")
        time.sleep(60)
        response = requests.get(path)
    if response.status_code == 200:
        return False

    print("Found an error code!")
    return True

def parse_single_artwork(data):
    id = data["id"]
    title = data["title"]
    description = data["description"]
    date_display = data["date_display"]
    style_id = data["style_id"]
    style_title = data["style_title"]
    artist_id = data["artist_id"]
    artist_title = data["artist_title"]
    artwork_type_id = data["artwork_type_id"]
    # these are the ids of all the artwork types we want, 1 is representing Paintings, checkout
    # the Chicago Insitute of Art data dump to see all the different types they have to offer
    artworked_wanted_indicies = [1]
    path = f'https://www.artic.edu/iiif/2/{data["image_id"]}/full/843,/0/default.jpg'
    if title is None or description is None or date_display is None \
    or style_title is None or artwork_type_id not in artworked_wanted_indicies or \
    check_if_path_is_invalid(path) :
        return None
    return {
            "id" : id, 
            "title" : title,
            "description" : description, 
            "date_display" : date_display,
            "path" : path, 
            "style_title" : style_title, 
            "style_id" : style_id, 
            "artist_title" : artist_title,
            "artist_id" : artist_id
            }
                   

def parse_json_folder(folder_path):
    parsed_artworks = []
    if not os.path.exists(folder_path):
        print(f"Folder '{folder_path}' does not exist.")
        return parsed_artworks

    #number_of_artworks_needed = 10
    number_of_artworks_parsed = 0
    items = os.listdir(folder_path)
    random.shuffle(items)

    for index, filename in enumerate(items):
        if filename.endswith('.json'):
            file_path = os.path.join(folder_path, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    if index % 1000 == 0:
                        print(f"Went though {index} artworks, and current number of artworks parsed is {number_of_artworks_parsed}.")

                    artwork_json = json.load(file)
                    artwork_parsed = parse_single_artwork(artwork_json)
                    if artwork_parsed is None:
                        continue
                    parsed_artworks.append(artwork_parsed)
                    number_of_artworks_parsed += 1

                    #if number_of_artworks_parsed > number_of_artworks_needed:
                    #   break
                    if number_of_artworks_parsed % 1000 == 0:
                        print(f"Parsed {number_of_artworks_parsed} artworks.")

            except json.JSONDecodeError as e:
                print(f"Error decoding JSON in file {filename}: {e}")
            except Exception as e:
                print(f"Error processing file {filename}: {e}")

    return parsed_artworks

def add_to_database(artworks):
    # PostgreSQL connection URI (update with your credentials)

    with open("url.txt", "r") as f:
        DATABASE_URI = f.read()

    # Connect to the PostgreSQL database
    engine = create_engine(DATABASE_URI)

    # Create the database and tables
    Base.metadata.create_all(engine)

    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session() 

    artworks_data = []
    artists_data = []
    genres_data = []

    artwork_ids = set()
    genre_ids = set()
    artist_ids = set()

    for artwork in artworks:
        # pprint(artwork)
        artwork_data = Artwork(**{
                        "id" : artwork["id"], 
                        "title": artwork["title"],
                        "date_display": artwork["date_display"],
                        "description": artwork["description"],
                        "path_to_artwork": artwork["path"],
                        "artist_id": artwork["artist_id"]
                        })
        
        artist_id = artwork["artist_id"] if artwork["artist_id"] is not None else -1 
        artist_name = artwork["artist_title"] if artwork["artist_title"] is not None else "Unknown" 


        artist_data = Artist(**{
            "id" : artist_id,
            "name" : artist_name
        })

        genre_data = Genre(**{
            "id" : artwork["style_id"],
            "name" : artwork["style_title"]
        })

        if artist_id not in artist_ids:  
            artists_data.append(artist_data)
        if artwork["style_id"] not in genre_ids:
            genres_data.append(genre_data)

        new_artist_data = list(filter(lambda elem : elem.id == artist_id, artists_data))
        new_genre_data = list(filter(lambda elem : elem.id == artwork["style_id"], genres_data))
        print(new_artist_data)
        artwork_data.artist = new_artist_data[0]
        artwork_data.genres.append(new_genre_data[0])

        artwork_ids.add(artwork["id"])
        artist_ids.add(artist_id)
        genre_ids.add(artwork["style_id"])


    session.add_all(artists_data)
    session.add_all(genres_data)
    print('ovo sranje')
    session.add_all(artworks_data)
    session.commit()
        
        



parsed_artworks = parse_json_folder("../../artworks") 
random.shuffle(parsed_artworks)
add_to_database(parsed_artworks)

pprint(parsed_artworks)

