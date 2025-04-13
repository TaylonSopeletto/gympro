from icrawler.builtin import GoogleImageCrawler
import os
import logging
import time

logging.basicConfig(level=logging.INFO)

training_img_amonth = 150 
validation_img_count = 30

queries = [
    "gym treadmill",
    "exercise bike",
    "leg extension machine",
    "leg curl machine",
    "cable crossover machine",
    "flat bench press",
    "squat rack"
]

def download_images(query, output_dir, num_images=training_img_amonth, retries=10):
    attempt = 0
    while attempt < retries:
        try:
            logging.info(f"Starting download for {query} (Attempt {attempt + 1}/{retries})...")
            crawler = GoogleImageCrawler(
                storage={'root_dir': output_dir},
                downloader_threads=4 
            )
            crawler.crawl(keyword=query, max_num=num_images)
            logging.info(f"Successfully downloaded images for: {query}")
            break 
        except Exception as e:
            logging.error(f"Error downloading images for {query}: {str(e)}")
            attempt += 1
            if attempt < retries:
                logging.info(f"Retrying for {query}...")
                time.sleep(5)
            else:
                logging.error(f"Failed to download images for {query} after {retries} attempts.")

for query in queries:
    output_dir_train = f'dataset/train/{query.replace(" ", "_")}'
    download_images(query, output_dir_train, num_images=training_img_amonth)

for query in queries:
    output_dir_val = f'dataset/val/{query.replace(" ", "_")}'
    download_images(query, output_dir_val, num_images=validation_img_count)