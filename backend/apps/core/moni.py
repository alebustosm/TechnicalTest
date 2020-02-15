from __future__ import absolute_import, unicode_literals

import logging
import urllib
import os
import requests
import json

logger = logging.getLogger('moniapi')


BASE_DOMAIN = os.getenv('MONIAPI_URL', None)

BASE_API_ENDPOINT = BASE_DOMAIN + "api/v1/"



class MoniConsumerAPIException(Exception):
    def __init__(self, *args, **kwargs):
        self.message = kwargs.get('message', "")
        self.error_code = kwargs.get('error_code', "")
        self.kwargs = kwargs
        logger.debug(
            "Moni Consumer API Exception %s" % kwargs)  # TODO: Warning this log in production

    @property
    def json(self):
        return self.kwargs


def handler_req_except():
    def decorate(func):
        def call(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except requests.ConnectTimeout as e:
                raise MoniConsumerAPIException(**{
                    'message': 'Conection Timeout',
                    'function': 'MoniApi',
                    'error_code': "-",
                    'raw_response': e
                })
            except requests.ConnectionError as e:
                raise MoniConsumerAPIException(**{
                    'message': 'Conection Error',
                    'function': 'MoniApi',
                    'error_code': "-",
                    'raw_response': e
                })

        return call
    return decorate



class MoniAPI(object):
    """
        Moni system Connection class 
    """

    def __init__(self, *args, **kwargs):
        pass
       

    def get_default_header(self):
        """
        Return default header for consumer
        """
        return {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }


    @handler_req_except()
    def get_scoring(self,borrower):

        params = { 
                "document_number":borrower.document_number,
                "email":borrower.email,
                "gender":borrower.gender,
                }
        
        params = json.dumps(params, ensure_ascii=False)
        response = requests.request("GET",BASE_API_ENDPOINT +"scoring/", params=params, headers=self.get_default_header())

        data = response.json()
        
        if response.ok:
            return data
        else:
            raise MoniConsumerAPIException(**{
                'message': 'Get Scoring Error',
                'function': 'get_scoring',
                'error_code': data.get('error', '-'),
                'raw_response': data
            })

    