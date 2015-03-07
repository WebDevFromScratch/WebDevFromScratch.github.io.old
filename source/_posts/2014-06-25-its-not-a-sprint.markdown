---
author: admin
comments: true
date: 2014-06-25 08:24:10+00:00
layout: post
slug: its-not-a-sprint
title: It's Not a Sprint
wordpress_id: 91
tags:
- Rails
- Ruby
- Tealeaf Academy
- The Odin Project
keywords: "ruby, rails, tealeaf, tealeaf academy, the odin project"
description: ""
---

So I've been having some time off learning. I stayed at my family's for almost a week and when I came back, it was my time to be a host for the weekend. My study time suffered a hard blow. I did what I could, but it wasn't much. The last two days though have been very fruitful learning-wise and I feel like I'm regaining the good rhytm again. Here's what I've been able to accomplish since the last blog post.



## The Odin Project



As I promised [the last time](http://www.webdeveloperfromscratch.com/blog/become-a-web-developer-for-free/), I decided to check [The Odin Project](http://www.theodinproject.com/) while I was away. Of course I had less time than I hoped (don't even ask...). Still, I did make some progress with it. I skimmed through ['Web Development 101'](http://www.theodinproject.com/web-development-101) and dived into ['Ruby Programming'](http://www.theodinproject.com/ruby-programming/) section.

I thought I'm already not too bad with my Ruby skills, but TOP exercises proved me wrong. Due to time constraints, I was only able to complete the basic 'Building Blocks' part. And it was not easy... After doing some required reading (Very helpful! I not only refreshed my knowledge, but learned a few new tricks) I tried to tackle the building part. 'Estimated time: 3-5 hrs' did not apply to me. I didn't measured it anyhow, but I think it was more like 7 hrs in my case. And I don't think my code is too great. I had to rely on the help from google quite a few times. Below are my solutions to the problems from this chapter:

**Caesar's Cipher**

```ruby ceasars_cipher.rb
@letters = ('a'..'z').to_a #size = 26
@capital_letters = ('A'..'Z').to_a

def caesar_cipher
  puts "Write a message to decode!"
  string = gets.chomp
  puts "What should the shift be?"
  shift = gets.chomp.to_i

  string = string.split(//) #turned into an array

  string.each do |char|
    if !@letters.include?(char) && !@capital_letters.include?(char)
      print char
    elsif @capital_letters.include?(char)
      index = @capital_letters.index(char)
      index += shift
      index %= @capital_letters.size

      print @capital_letters[index]
    else
      index = @letters.index(char)
      index += shift
      index %= @letters.size

      print @letters[index]
    end
  end
end

caesar_cipher

puts ""
```


**Stock Picker**

``` ruby stock_picker.rb
array = [11, 32, 122, 19, 23, 5, 54]

puts "Prices of a stock in time: #{array}"
puts ""

def stock_picker(some_array)
  diff_array = Array.new
  diff_hash = Hash.new

  some_array.each do |num|
    unless some_array[some_array.index(num) + 1] == nil
      x = 1
      until some_array[some_array.index(num) + x] == nil
        diff = some_array[some_array.index(num) + x] - num
        diff_array << diff
        diff_hash[diff] = [some_array.index(num), some_array.index(num) + x]
        x += 1
      end
    end
  end

  # get the biggest difference and print the correct statement (corrected so that days starts at 1)
  puts "Best day to buy is #{diff_hash[diff_array.max][0] + 1} and to sell is #{diff_hash[diff_array.max][1] + 1}."
  puts "This would make you $#{diff_array.max}."
end

stock_picker(array)
```


**Substrings**

```ruby substrings.rb
my_dictionary = ["below","down","go","going","horn","how","howdy","it","i",
              "low","own","part","partner","sit"]

puts "Please enter text to check with our dictionary:"
my_string = gets.chomp

def substrings(string, dictionary)
  substrings_hash = Hash.new(0)
  string.downcase! #to catch capital letters

  dictionary.each do |word|
    #new_string = string #how to make them not being the same var?
    new_string = String.new(string) #this works perfectly!
    while new_string.include? word
      substrings_hash[word] += 1
      new_string.slice! word
    end
  end

  #sorting by occurence (additional feature)
  substrings_hash = substrings_hash.sort_by { |key, value| value }.reverse

  puts ""
  puts "These words from our dictionary occur in your text:"
  p substrings_hash
end

substrings(my_string, my_dictionary)
```


I once got stuck for a really long time (during 'stockpicker') and thought this is too difficult. But the key was to just set what I need to achieve clearly, using pseudo code and then I just started from scratch again and it was a pretty smooth process from then on. I have to say though that I felt really, really bad having to spend so much time on so little code. I thought I'm not that bad at Ruby! I definitely need to carry on with TOP to improve in this area, I will probably set aside one day a week for this.



## Tealeaf



I also didn't do too much in regard to [Tealeaf](http://www.gotealeaf.com). I'm catching on for the last two days though, I refreshed my knowledge by re-reading my notes and watched the lectures vids that appeared in the meanwhile. After that, I started implementing a Twitter-clone app on my own and I was able to get quite far! I feel like I got a good grasp of Rails basics by now and this makes me really happy. I know there's a long way to go from here, but I'm glad I'm actually able to make stuff on my own and understand what I'm doing. That's exactly what I was expecting from Tealeaf Academy, so I'm even more convinced now that what I paid for it is a money well spent.

For the next few days I'm going to work some more on my Twitter app and also my Postit app (Reddit clone) implementation. I'll hopefully also catch up with lessons a little, wrap up Week 2 and maybe even do the whole Week 3. I have a lot of time for these this week. Fingers crossed!
