import os
import json
import random
from pprint import pprint
import requests
import time

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


parsed_artworks = parse_json_folder("../../artworks") 
random.shuffle(parsed_artworks)
pprint(parsed_artworks)
print(len(parsed_artworks))