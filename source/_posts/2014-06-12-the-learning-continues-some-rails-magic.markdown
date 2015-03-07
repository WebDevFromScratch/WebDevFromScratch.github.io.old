---
author: admin
comments: true
date: 2014-06-12 08:09:35+00:00
layout: post
slug: the-learning-continues-some-rails-magic
title: The Learning Continues - Some Rails Magic
wordpress_id: 61
tags:
- Rails
- Ruby
- Tealeaf Academy
keywords: "ruby, rails , tealeaf, tealeaf academy"
description: "Some chaotic notes on my learning with Tealeaf Academy"
---

I'm long due another update on how my progress with [Tealeaf](http://www.gotealeaf.com) is going, but I just can't force myself to write it... Let me just say I dived deep into Rails and am trying to wrap my head around it's magic (actually, there's no magic at all, just conventions that Rails assumes - definitely need to write something about it soon!).

Meanwhile, I figured I'll post notes on the latest video lecture I watched. If you stumbled upon this blog of mine and are thinking about joining Tealeaf, this is an example of what we learn there. Making these sort of notes is not mandatory of course, everything you need is in video format. But I like to make them, it helps me memorize more. Okay, no more rambling, move on the notes (these are from Lecture 3 of the Rails course).



## Rails Forms


sidenote: in Rails we can refer to a key by a symbol (in params hash, for example) even though it's a string (a hash with indifferent access)

Creating a form
- how to do that using 3 ways (on an example of a new (creating) post form)


### 1. Pure HTML


``` html HTML form
<form action='/posts' method='POST'>
  Title: <input type='text' name='my_title'>
  <br/>
  <input type='submit'>
</form>
```

this wouldn't as a deault work in Rails, because of a 'protect_from_forgery' validation error (if we removed protect_from_forgery from application_controller.rb, this would work)

this is not the best from the point of security of our app

This is the most manual way, we never do this in Rails. We'd need to hack our application_controller and we definitely don't want that.



### 2. Rails form helper



``` ruby Form Helper
<%= form_tag '/posts' do %>
  <%= label_tag :title %>
  <%= text_field_tag :title %>


  <%= submit_tag "Create Post" %>
<% end %>
```

this adds authenticity_token (which is hidden in html), which is needed for this 'protect_from_forgery' validation to work
helpers give us these little things that speeds up the work and saves us from some weird edge case errors

label element is correlated with input element (refers to it); is used for screenreaders that recognizes what's what (useful for blind internet users for example, to help them) <--- try to develop a habit of setting label elements

This would work just as the above HTML form.



### 3. Rails model-backed form



```ruby Model-Backed Form
<%= form_for @post do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>


  <%= f.submit "Create Post" %>
<% end %>
```

we need to set our @something variable in the controller (PostsController in case of @post) for it to work of course

  it assumes a lot of things for us

  creates an additional nested structure in our session params (adding another nested hash for 'post' key, where it assigns stuff specific to post, like title, etc.)

  naming conventions for how Rails saves these variables to create that nested structure can be seen when inspecting the HTML code (in browser), it has this format: post[title]

  !(that's why in code (especially Rails 3.x) we can see a lot of code that looks like this: Post.new(params[:post]))

  !also, thus we can do a mass assignment to Post object like this: Post.new('title'=>'some title') or Post.new(title: 'some title', url: 'some url') <--- these keys are our setter methods that come from ActiveRecord::Base; essentially that's because we have the columns called that in our database 'posts' table

  we can also use virtual attributes as keys here (like user:, category:, etc. <--- we set associations to these earlier)

  we can't just add random fields here though (like f.text_field :whatever) do to the connection we have with other layers (that Rails assumes) - we can only use variables that we can use mass assignments with (our table columns) as keys

  otherwise the connection (assumption, convention) breaks and we'd get a 'NoMethod' error
  we can add whatever variable we please in case of 'Rails form helpers', because then we just save them in our session params and not using these model-backed relations

Use whenever we can!

To use this model-backed form, we need to appropriately set our 'create' action in posts_controller.rb file:

```ruby posts_controller.rb
@post = Post.new(params[:post]) #this way we access params specific for our post
```
Strong parameters can be a cause of a lot of silent bugs (because they are security-related, there are usually no specific error messages)

!note: we don't want to use .create, because first we need to fulfill validation requirements - strong parameters (check below, then continue here) - so we need to change this like:

```ruby posts_controller.rb
def create
  @post = Post.new(post_params)

  if @post.save
    flash[:notice] = "Your post was created!"
    redirect_to posts_path
  else
    render 'new'
  end
end
```

!!!!! This above is very important pattern that needs to be memorized !!!!!

  if we create (.save method) our post, we want to redirect

  else (in case we hit a validation error, etc.), we want to render our template where we tried to create from again (which would now show our errors, letting the user know what needs to be done to create)



### Strong Parameters



back in Rails 3.x this was solved through 'attr_accessible', which we set in our models
example:

  attr_accessible :title, :url, :description

this above essentially whitelisted the mentioned variables for mass assignment

  Cons of this approach:

  - people overdid that and whitelisted everything, whenever hit an error (thus, losing security)

  - this needed to be set in the 'Model' layer, and the concern is actually in the actions ('Controller')

Rails 4 solves this by using strong parameters instead of attr_accessible

  - we can set this in the Controller

  - we can set this based on an user

We set it as a private method:

```ruby posts_controller.rb
class PostsController < ApplicationController
  #code code code

  def create
    post = Post.new(post_params[:post])
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :creator)
  end
end
```

- this require(:post) relates to our nested structured hash (we need a :post top-level key in our params, and then we set which lower-level (post) keys we want to permit to mass assignment)

- .permit! - permits everything
thus we can use it like this:

```ruby posts_controller.rb
def post_params
  if user.admin?
    params.require(:post).permit!
  else
    params.require(:post).permit(:title, :url)
  end
end
```

Strong parameters can be a cause of a lot of silent bugs (because they are security-related, there are usually no specific error messages)



### Validations



Always added to the 'Model' layer

We use them like this:

```ruby post.rb
class Post < ActiveRecord::Base
  #code code code

  validates :title, presence :true
end
```

this above means we need to have a title when creating a Post object

if we try to create the Post without the title, we get a rollback (we get returned 'false'; why? because we use if statement in our pattern in the Controller)

note: we can create our post 'in memory', the error will only appear when we try to hit a database with a query (try to save it)

to check what the error is, we can use .errors method (e.g. post.errors) in the console

when we hit that, we get a @messages hash with errors

then we can use a pre-set syntax post.error.full_messages, to return all the error communicates in an array (e.g. ["Title can't be blank", "Url can't be blank"])

This above is a weird way to save validation errors, but this is Rails convention (to set these types of errors on an object itself)

Looking back at our model-backed form:

```ruby posts_controller.rb
@post = Post.new(post_params)

  if @post.save
    flash[:notice] = "Your post was created!"
    redirect_to posts_path
  else
    render 'new' #validation error
  end
end
```

We can see that if there's an error, we render the view with the form again. We do it, so the user (client) will be able to fix their mistakes (we also need to add specific error communicates to the view - need to display the errors):

```erb new.html.erb

<% if @post.errors.any? %>
  There were some errors:
  <% @post.errors.full_messages.each do |msg| %>
    <%= msg %>
  <% end %>
<% end %>
```

we can style these above appropriately ofc

this is another pro to using model-backed forms, because we get those nice errors

!Careful: if we hit an error, in our view (HTML in browser), our errors 'error fields' automatically gets wrapped in an additional div (class="field_with_errors") - this is somethign Rails adds for us out of the box, then it's up to us to only give it a whatever style we want (CSS) (we can highlight the field, etc.)



### Re-using our previously created form for edit and update action

```ruby posts_controller.rb
def edit
  @post = Post.find(params[:id]) #GET method
end

def update
  @post = Post.find(params[:id]) #PATCH/PUT method

  if @post.update(post_params)
    flash[:update] = "The post was updated" #this will print us an alert
    redirect_to posts_path #we can redirect whenever feels logical (specific post ok too)
  else
    render :edit
  end
end
```

looking at HTML, this issues a POST request to /posts/id, but we have no route for this - instead it goes to the 'update' action

if we look closer inspecting HTML, there are a few hidden things wrapped in a div, one of them looking like this:

```html
<input type="_method" type="hidden" value="patch">
```

this is where our HTML verb (method) is actually re-assigned to PATCH (Rails uses session params for this, because some browsers only supports GET and POST methods <--- another Rails convention)

!!!!! - form_for is smart enough to recognize if our instance variable (@post in the example) refers to an existing object or creating a new one and will set the correct verb/method (in the hidden element) accordingly ---- thus we can extract our form to a partial and use it for different actions (create, edit, etc.) !!!!!

Our form partial that we could create here would effectively be used by 4 actions (new, create, edit, update) - thus we need to be very careful here.

since our form uses @post instance variable, each action needs to have it defined
make sure to test all the paths that we use/redirect to (especially error cases)



### before_action (in Rails 3.x - before_filters)



If we notice that in many of our actions we use some code many times, we can extract this to before_actions (which works like before filter in Sinatra):

```ruby posts_controller.rb
class PostController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update]

  #code code code

  private

  def set_post
    Post.find(params[:id])
  end
end
```

':set_post' sets our action to be executed before each action

'only:' filters this to certain actions we want

since we can set some repeating actions to that kind of before filter, we can end up having some empty methods (Rails conventions again!)

before_action is usually used for two purposes:

1. to set up instance variable for action

2. redirect based on some condition



### Non-stadard flow



Example of non-standard flow: create comment form that appears on the post page (in opposition to stadard flow, where it would be on create comment page).

``` ruby posts/show.html.erb

#code code code

#Create a comment

<%= form_for [@post, @comment] do |f| %>
  <%= f.text_area :body %>

  <%= f.submit "Create Comment" %>
<% end %>
```

```ruby posts_controller.rb
#code code code

def show
  @comment = Comment.new #we need to set that for our form to work
end
```

```ruby comments_controller.rb
#code code code

def create
  @post = Post.find(params[:post_id]) #this is how we need to refer to id here (post_id in opposition to just id when we're in post controller - that's because of how we get that saved by Rails in our params hash)
  @comment = Comment.new(params.require(:comment).permit(:body)) #strong parameters - normally we'd extract that to a private method, but with no update action there is not much point there

  if @comment.save
    flash[:notice] = "Your comment was added" #need to ask how that works in next live session
    redirect_to post_path(@post)
  else
    render 'posts/show' #we can't render comment view here, because we don't have that action (only create) and we want to see our comments on the post page
  end
end
```

The path we want here is: /posts/:post_id/comments(.:format)
      - @post needs to be an existing object (we're on show post page, so that's okat)
      - @comment needs to be a new object



## Sum Up



And that's it. Quite some notes, as I look at it right now. I know that it's not too pretty (and really chaotic!), I'm making notes in my text editor ([Sublime 3](http://www.sublimetext.com/3)) and formatting it would take a lot of my precious time ;) But it's the content that matters, right? The least I could do was to extract and format the code, which I did with a help of a cool Wordpress plugin I just found yesterday, [CodeColorer](http://wordpress.org/plugins/codecolorer/).

The video lasted for about 2.5 hours (split into two parts) and is just one in a series that there are in each Tealeaf course.
