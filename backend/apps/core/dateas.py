from __future__ import absolute_import, unicode_literals

import logging
import urllib
import os
import requests
import json
from bs4 import BeautifulSoup

logger = logging.getLogger('dateas')

BASE_DOMAIN = os.getenv('DATEAS_URL', None)


class DateasAPI(object):
    """
        DateasAPI system Connection class 
    """

    def __init__(self, *args, **kwargs):
        pass
       

    def get_default_header(self):
        """
        Return default header for consumer 
        """
        return {
           'User-Agent':'PostmanRuntime/7.22.0',
            'Accept':'*/*',
            'Cache-Control':'no-cache',
        }


    def get_data(self,document):
        
        response = requests.request("GET",BASE_DOMAIN+"?cuit={0}&tipo=fisicas-juridicas".format(str(document)), headers=self.get_default_header())

        soup = BeautifulSoup(response.text, 'html.parser')
        try:
            data = soup.find('tr', attrs={'class':'odd'})
            name = data.find_all('a')[0]
            return name.text
        except Exception as e:
            return None
    

    