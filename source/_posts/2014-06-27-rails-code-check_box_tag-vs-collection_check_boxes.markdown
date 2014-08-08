---
author: admin
comments: true
date: 2014-06-27 08:11:44+00:00
layout: post
slug: rails-code-check_box_tag-vs-collection_check_boxes
title: Rails Code - check_box_tag vs collection_check_boxes
wordpress_id: 111
tags:
- checkboxes
- check_box_tag
- collection_check_boxes
- Rails
- Ruby
---

Just a short post, that shows two ways of implementing checkbox feature in a Rails form. First using **check_box_tag** helper. I have to say I was quite happy getting to this:

```ruby
<% Category.all.each do |cat| %>
  <%= cat.name %>
  <%= check_box_tag :category_ids,
                     cat.id,
                     @post.categories.include?(cat),
                     name: 'post[category_ids][]' %>
<% end %>
```

But then I discovered there is a more elegant way, using **collection_check_boxes**:

```ruby
<%= collection_check_boxes :post, :category_ids, Category.all, :id, :category_name %>
```

Yup, just that accomplishes pretty much the same. Below a more elegant way, with labels added. Also, the object is already set (as 'f') by our model backed form (see below, under ('Form')):

```ruby
<%= f.collection_check_boxes :category_ids, Category.all, :id, :category_name do |cb| %>
  <% cb.label {cb.check_box + cb.text} %>
<% end %>
```



## Form



These snippets above assumes we have this form set up:

```ruby
<%= form_for @post do |f| %>

  #our code goes here

  <%= f.submit action_description, class: 'btn btn-primary' %>
<% end %>
```

Above checkboxes describes **has_many :through** relationship, between **Post** and **Category** classes (models).

More on Rails helpers for checkboxes can be found in the various docs, for example on [Apidock](http://apidock.com/): [check_box_tag](http://apidock.com/rails/ActionView/Helpers/FormTagHelper/check_box_tag), [collection_check_boxes](http://apidock.com/rails/v4.0.2/ActionView/Helpers/FormOptionsHelper/collection_check_boxes)
