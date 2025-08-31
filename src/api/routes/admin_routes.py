from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from api.models.user_model import User, UserDirection
from api.model_config import db
