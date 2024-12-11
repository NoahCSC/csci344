import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        
        try:
            limit = int(request.args.get("limit", 20))
            if limit>50:
                return Response(json.dumps({"message": "The limit is 50"}), mimetype="application/json", status=400)
        except:
            return Response(json.dumps({"message": "The limit must be an integer between 1 and 50"}), mimetype="application/json", status=400)
        
      
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(limit)
        # : add the ability to handle the "limit" query parameter:

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # : handle POST logic
        data = request.json
        #print(data)
        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")
        if not image_url:
            return Response(json.dumps({"message": "image_url is a required parameter"}), mimetype="application/json", status=400)
        new_post = Post(
        image_url=image_url,
        user_id=self.current_user.id, # must be a valid user_id or will throw an error
        caption=caption,
        alt_text=alt_text
        )
        db.session.add(new_post)    # issues the insert statement
        db.session.commit()         # commits the change to the database 
        return Response(json.dumps(new_post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        #print("POST id=", id)
        # : Add PATCH logic...
        data = request.json
        #print(data)
        post = Post.query.get(id)
        if(post is None):
            return Response(
            json.dumps({"Message": f"Post id={id} not found."}),
            mimetype="application/json",
            status=404,
        )

        #post.image_url = 'https://picsum.photos/600/430?id=443'
        if(post.user_id==self.current_user.id):
            if data.get("caption"):
                post.caption = data.get("caption")

            if data.get("alt_text"):
                post.alt_text = data.get("alt_text")
            if data.get("image_url"):
                post.image_url = data.get("image_url")
            db.session.commit()
            return Response(json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=200) 
       
            

        # commit changes:
         
        return Response(
            json.dumps({"Message": f"Post id={id} unauthorized."}),
            mimetype="application/json",
            status=404,
        )
        
    

    def delete(self, id):
        #print("POST id=", id)
        post = Post.query.get(id) 
        if(post is None):
            return Response(
            json.dumps({"Message": f"Post id={id} not found."}),
            mimetype="application/json",
            status=404,
        )
        if(post.user_id==self.current_user.id):
            Post.query.filter_by(id=id).delete()
            db.session.commit()
            return Response(
                json.dumps({"Message": f"Post id={id} deleted."}),
                mimetype="application/json",
                status=200,
            )

        # Post.query.filter_by(id).delete()
       

        # should return None
        # : Add DELETE logic...
        return Response(
            json.dumps({"Message": f"Post id={id} unauthorized."}),
            mimetype="application/json",
            status=404,
        )

    def get(self, id):
        #print("POST id=", id)
        # : Add GET logic...
        can_view = can_view_post(id, self.current_user)
        post = Post.query.get(id)
        if(can_view):
            post = Post.query.get(id)
            return Response(
             json.dumps(post.to_dict(user=self.current_user)),
             mimetype="application/json",
             status=200,
              ) 
              
        elif(post is None):
            return Response(
             json.dumps({"Message": f"Post id={id} not found."}),
             mimetype="application/json",
             status=404,
              )
        return Response(
            json.dumps({"Message": f"Post id={id} unauthorized."}),
             mimetype="application/json",
            status=404,
        )          



def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
