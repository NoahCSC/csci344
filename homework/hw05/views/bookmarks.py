import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # TODO: Add GET Logic...
        # Send query
        # SELECT * FROM bookmarks where user_id=12;
       
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id).all()
        if(bookmarks is None):
                return Response(
                json.dumps({"Message": f"The user has not bookmarked any posts."}),
                mimetype="application/json",
                status=404,
            )
        
            

        data = [item.to_dict() for item in bookmarks]
        return Response(
                json.dumps(data),
                mimetype="application/json",
                status=200,
            )
       
        

    def post(self):
        # TODO: Add POST Logic...
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add Delete Logic...
        print(id)
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )