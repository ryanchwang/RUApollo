from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
#soc = Schedule of Classes
socDriver = driver.get("https://classes.rutgers.edu/soc/#home")

# termInput = input("What term?: ")
# termLocation = input("What campus?: ")
# termLevel = input("What level?: ")

termElement = driver.find_element(By.ID, "FALL_SPRING_1_INPUT")
locationElement = driver.find_element(By.ID, "campus_NB")
levelElement = driver.find_element(By.ID, "level_U")

termElement.click()
locationElement.click()
levelElement.click()


driver.find_element(By.ID, "continueButton")








