print("ha")
# # code
# import sys
# import requests
# from bs4 import BeautifulSoup 
# from csv import writer
# # bs4 module for web scraping and requests for making HTTPS requests using Python.
# response = requests.get('https://leetcode.com / parth1818')
# soup = BeautifulSoup(response.text, 'html.parser')
# main_content = soup.select(
# 	'# base_content>div>div>div.col-sm-5.col-md-4>div:nth-child(3)>ul')
# list_items = main_content[0].select('li')
# items = ['Solved Question', 'Accepted Submission', 'Acceptance Rate']
# n = 0

# # It will create csv files named progress.csv in root folder once this is script is called.
# with open('progress.csv', 'w') as csv_file:
# csv_writer = writer(csv_file)
# headers = ['Name', 'Score']
# csv_writer.writerow(headers)
# while(n < 3):
# 	name = items[n]
# 	score = list_items[n].find('span').get_text().strip()
# 	csv_writer.writerow([name, score])
# 	n = n + 1
# print("csv file created for leetcode")
