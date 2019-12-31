'use strict';

var log = hexo.log || log.log;

var postSeriesToPostMap = {}

hexo.extend.filter.register('before_generate', function(){
    postSeriesToPostMap = {}
});

hexo.extend.filter.register('before_post_render', function (postInfo) {
    if (!postSeriesToPostMap[postInfo.series]) {
        postSeriesToPostMap[postInfo.series] = [];
    }
    // console.log(postInfo);

    if (!postInfo.published) {
        return;
    }

    postSeriesToPostMap[postInfo.series].push({
        'id': postInfo.id,
        'title': postInfo.title,
        'path': postInfo.path,
        'permalink': postInfo.permalink,
        'date': postInfo.date.unix()
    });
});

hexo.extend.tag.register('posts_in_same_series', function (args) {
    var config = hexo.config.post_series;
    var postInfo = this;

    var postsInSameSeries = postSeriesToPostMap[postInfo.series];
    log.d(postsInSameSeries.length + " posts found in the same series for post: " + postInfo.path);

    if (postsInSameSeries.length === 0) {
        return '';
    }

    log.log(postsInSameSeries.length + " posts found in the same series, post series updated: " + postInfo.path);

    postsInSameSeries.sort(function (left, right) {
        if (config.reverse_sort) {
            return left.date < right.date;
        }
        return left.date > right.date;
    });

    var config = hexo.config.post_series;

    var postSeriesHtmlSegments = ['<div class="post-series">'];
    if (config.list_title) {
        postSeriesHtmlSegments = postSeriesHtmlSegments.concat(['<div class="post-series-title">', config.list_title, '</div>']);
    }
    postSeriesHtmlSegments.push('<ul class="post-series-list">');

    postsInSameSeries.reduce(function (result, post) {
        result.push('<li class="post-series-list-item"><a href="');
        result.push(isRunningInLocalServerMode() ? '/' + post.path : post.permalink);
        result.push(config.open_in_new_tab ? '" target="_blank">' : '">');
        result.push(post.title);
        result.push('</a></li>');
        return result;
    }, postSeriesHtmlSegments);

    postSeriesHtmlSegments.push('</ul></div>');

    var postSeriesHtml = postSeriesHtmlSegments.join('');
    return postSeriesHtml;
});

function isRunningInLocalServerMode() {
    return process.argv.indexOf('server') > -1 || process.argv.indexOf('s') > -1;
}
