import os
import json
import random
from pprint import pprint

def parse_single_artwork(data):
    id = data["id"]
    title = data["title"]
    description = data["description"]
    date_display = data["date_display"]
    style_title = data["style_title"]
    artwork_type_id = data["artwork_type_id"]
    # TODO: This could be a 404, should have a test case for this
    path = f'https://www.artic.edu/iiif/2/{data["image_id"]}/full/843,/0/default.jpg'
    if title is None or description is None or date_display is None or style_title is None or artwork_type_id != 1:
        return None
    return (id, title, description, date_display, path, style_title)
                   

def parse_json_folder(folder_path):
    parsed_artworks = []
    if not os.path.exists(folder_path):
        print(f"Folder '{folder_path}' does not exist.")
        return parsed_artworks

    # number_of_artworks_needed = 200
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

                    # if number_of_artworks_parsed > number_of_artworks_needed:
                    #    break
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