const BASE_API = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyC8MSncXMVOy4puU0tyLcMHKUoAWj0Abqc';
const BASE_VIDEO = 'https://www.youtube.com/watch?v=';
let data = {};

function renderResult(result) {
  const RESULTS = `
  <a href='${BASE_VIDEO + result.id.videoId}' target='blank' class="card" id="${result.id.videoId}">
    <img src="${result.snippet.thumbnails.medium.url}" class="result-item" alt="Search result thumbnail image. Click to open video in new tab." />
    <p>${result.snippet.title}</p>
  </a>
  `;

  return RESULTS;
}

function displayResults(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-results').html(results);
}

function renderFeedback(query){
  const feedback = `<p>You searched for '${query}'. Here are the first 5 results.<p>`;
  $('.js-feedback').html(feedback);
}

function getData(searchTerm, callback) {
    const settings = {
      url: BASE_API,
      data: {
          part: 'snippet',
          key: API_KEY,
          q: `${searchTerm}`,
      },
      dataType: 'json',
      type: 'GET',
      success: callback,
    };
  
    $.ajax(settings);
}

function initHandler() {
  $('.js-youtube-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getData(query, displayResults);
    renderFeedback(query);
  });
}

$(initHandler);