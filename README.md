# hexo-post-series

[![npm version](https://badge.fury.io/js/hexo-post-series.svg)](http://badge.fury.io/js/hexo-post-series)

This plugin is made for adding your post to a series and display it anywhere you like in your post.

## Installation

``` bash
$ npm install hexo-post-series --save
```

## Usage

### Add post to a series
Adding post to a series is very easy, just put ```series: series-title-you-like``` to the post info section. For example:
```
---
title: A test post
tags:
  - tag1
  - tag2
series: test-posts
---
```

### Show post series in your post
To show all the posts in the same series as the current post, just add the following tag into your post anywhere you like.
```
{% posts_in_same_series %}
```

### Series list and styles
The post series list is constructed as following. To change its appearance, we can set the css styles in your theme.

```
<div class="post-series">
    <div class="post-series-title">{post series list title}</div>
    <ul class="post-series-list">
        <li class="post-series-list-item"><a href="{post_link}">{post title}</a></li>
    </ul>
</div>
```

### Configurations
The configurations we supported now are quite simple.
* list_title: Specify the title you'd like to show before the list. If list title is empty, we won't generate the post-series-title div.
* open_in_new_tab: If true, a ```target="_blank"``` will be put into the anchor.
* reverse_sort: If true, the most recent created post will be put at first, otherwise, the least recent created post.

Here is a sample:
```
# Post series
post_series:
    list_title: "Same Series:"
    open_in_new_tab: false
    reverse_sort: false
```

## License

BSD v3
