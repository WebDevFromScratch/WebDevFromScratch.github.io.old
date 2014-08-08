---
author: admin
comments: true
date: 2014-06-09 08:11:03+00:00
layout: post
slug: tictactoe-ruby-game
title: TicTacToe Ruby Game
wordpress_id: 55
tags:
- programming
- Ruby
---

After writing a post here yesterday ([Tealeaf Progress Check No. 2 – Course 1 Done!](http://www.webdeveloperfromscratch.com/blog/tealeaf-progress-check-no-2-course-1-done/)), I went back to review the course 1 for the last time and found out that there was a new task to be done, building a simple command line TicTacToe game. As exercises is definitely something I need, I instantly decided that I want to try and write this of course :) Couple of hours later (and with a little help from the video on how to tackle this), my game was ready. I figured this should be a good piece of code to share as the first of hopefully many more here on the blog. So here it is:



## Ruby TicTacToe


``` ruby tictactoe.rb
board_fields = {1 => " ", 2 => " ", 3 => " ", 4 => " ", 5 => " ", 6 => " ",
                7 => " ", 8 => " ", 9 => " "}
empty_fields = [1, 2, 3, 4, 5, 6, 7, 8, 9]
@game = true

def draw_board(bf)
  system "clear"
  puts "Fields Numbers:"
  puts ""
  puts " 1 | 2 | 3 "
  puts "---+---+---"
  puts " 4 | 5 | 6 "
  puts "---+---+---"
  puts " 7 | 8 | 9 "
  puts ""
  puts "Game Board:"
  puts ""
  puts " #{bf[1]} | #{bf[2]} | #{bf[3]} "
  puts "---+---+---"
  puts " #{bf[4]} | #{bf[5]} | #{bf[6]} "
  puts "---+---+---"
  puts " #{bf[7]} | #{bf[8]} | #{bf[9]} "
  puts ""
end

def fill_field(bf, ef)
  bf.each do |key, value|
    if value != " "
      ef.delete(key)
    end
  end
end

def all_fields_filled?(ef)
  if ef == []
    puts "It's a tie!"
    @game = false
  end
end

def winner?(bf)
  winning_routes = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8],
                   [3, 6, 9], [1, 5, 9], [3, 5, 7]]
  winning_routes.each do |elem|
    if bf[elem[0]] == "X" && bf[elem[1]] == "X" && bf[elem[2]] == "X"
      puts "Congratulations! You win!"
      @game = false
      exit #else there could be two winners
    elsif bf[elem[0]] == "O" && bf[elem[1]] == "O" && bf[elem[2]] == "O"
      puts "Sorry! You lost!"
      @game = false
    end
  end
end

#game starts
draw_board(board_fields)

while @game
  #player turn
  puts "Choose an empty field (1-9):"
  chosen_field = gets.chomp.to_i

  until empty_fields.include? chosen_field
    puts "Wrong field number. Please choose again."
    puts ""
    chosen_field = gets.chomp.to_i
  end

  board_fields[chosen_field] = "X"
  fill_field(board_fields, empty_fields)
  draw_board(board_fields)
  winner?(board_fields)
  all_fields_filled?(empty_fields)

  #computer turn
  comp_chosen_field = empty_fields.sample #this picks a random element
  board_fields[comp_chosen_field] = "O"
  fill_field(board_fields, empty_fields)
  draw_board(board_fields)
  winner?(board_fields)
  all_fields_filled?(empty_fields)
end

#think about how to implement AI (google for it maybe)
```

Computer's decision are random at this point, implementing some AI for this is probably beyond me right now. But I'd love to go back to this little game some time from now and add this feature. This can also be very easily changed into a game for two players, which would work nicely (no AI needed there!).
