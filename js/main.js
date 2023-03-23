var data = data

// - - - CATEGORY PAGE - - -

// makes category divs clickable, select the category story from data and redirect to input words page
var categoryClick = function () {
  let categories = Object.keys(data);
  for (let category of categories) {
    document.getElementById(category+"-category").onclick = function () {
      location.href = "./input_words.html?category="+category;
    };
  }
}



// - - - INPUT PAGE - - -

// select story based on category parameter found in url
var selectStory = function () {
  let url = new URL(window.location.href);
  let category = url.searchParams.get("category");
  let selected_story = data[category]["Easy"];
  return selected_story
}

// find words sorrounded by round or square brackets from the selected story string: put them into blank_list and substitude them with a * in the original string
var findBlankWords = function (selected_story) {
    var blank_list = [];
    for (let index=0;index<=selected_story.length;index++) {
        var character = selected_story[index];
        if (character == "(" || character == "[") {
            var word_char_index = index+1;
            while (selected_story[word_char_index] != ")" && selected_story[word_char_index] != "]" && word_char_index <= selected_story.length) {
                word_char_index ++;
            }
            let new_blank_word = selected_story.slice(index+1, word_char_index);
            selected_story = selected_story.slice(0,index) + "*" + selected_story.slice(word_char_index+1);
            blank_list.push(new_blank_word);
        }
      }
    return [blank_list, selected_story]
  };

// populate html with one input box for each blank word
var setInputWordsPage = function () {
  [blank_list, blank_story] = findBlankWords(selectStory());
  input_words_html = ''
  for (let word of blank_list) {
    input_words_html += '<div class="main-content__section-block"><label for="fname">'+word+':</label><input type="text" id="fname" name="fname"><br><br></div>'
  }
  document.getElementById("input_words").innerHTML = input_words_html;
}