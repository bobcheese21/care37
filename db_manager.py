import psycopg2
import uuid
from datetime import datetime
import time
from configparser import ConfigParser


def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(
            'Section {0} not found in the {1} file'.format(section, filename))

    return db

def update_user_entry(recipientProfile, dollars):
    """ Update the user donated amount and the num donations after recieiving payment """
    new_num_donations = recipientProfile.get_num_donations() + 1
    new_total_recieved = recipientProfile.get_amount_recieved() + dollars
    ruid = recipientProfile.get_recipient_user_id()
    
    sql = """UPDATE recipients SET num_donations = (%s), total_recieved = (%s) WHERE uid = (%s);"""

    data = (str(new_num_donations), str(new_total_recieved), str(ruid))
    conn = None
    vendor_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "user inserted with uid: " + str(created_uuid)
    # TODO need to add last donation date to schema to get a more accurate burn rate adjusted amount


def insert_donation(recipientProfile, dollars, donor_email, donor_first_name, donor_last_name):
    """ Insert donation record into donations database """
    ruid = recipientProfile.get_recipient_user_id()
    sql = """INSERT INTO donations(tid, uid, amount_donated, donor_email, donor_first_name, donor_last_name,
             donation_timestamp, donor_email_sent, recipient_email_sent)

             VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"""
    conn = None
    vendor_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # get the date created (TIMESTAMP '2004-10-19 10:23:54')
        timestamp_string = time.strftime(
            "%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
        # generate the Uid
        uuid_string = donor_email + timestamp_string
        created_tuid = uuid.uuid5(uuid.NAMESPACE_OID, uuid_string)
        # execute the INSERT statement
        data = (str(created_tuid), str(ruid), str(dollars), donor_email, donor_first_name, donor_last_name, timestamp_string, 0, 0)

        cur.execute(sql, data)

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "user inserted with uid: " + str(created_uuid)


def insert_user(email, first_name, last_name, bio, zip_code):
    """ insert a new vendor into the vendors table """
    sql = """INSERT INTO recipients(uid, email, first_name, last_name, bio, zip_code, date_created,
                                    num_donations, total_recieved)

             VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
    conn = None
    vendor_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # get the date created (TIMESTAMP '2004-10-19 10:23:54')
        timestamp_string = time.strftime(
            "%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
        # generate the Uid
        created_uuid = uuid.uuid5(uuid.NAMESPACE_OID, email)
        # execute the INSERT statement
        cur.execute(sql, (str(created_uuid), email, first_name, last_name, bio, str(
            zip_code), timestamp_string, str(0), str(0)))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        return "FAILED!! Nice going idiot: " + str(error)
    finally:
        if conn is not None:
            conn.close()

    return "user inserted with uid: " + str(created_uuid)
