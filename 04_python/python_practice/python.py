import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(
        host='localhost', database='Electronics', user='root', password='ikonpass')

    mySql_Create_Table_Query = """INSERT INTO Electronics.Laptop VALUES (001, 'Macbook Pro', 2000, '2020-01-30')"""
    cursor = connection.cursor()
    result = cursor.execute(mySql_Create_Table_Query)
    print("Data was created successfully ")

except Error as e:
    print("Failed to create table in MySQL: {}".format(e))
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
