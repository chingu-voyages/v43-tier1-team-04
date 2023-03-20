let demo_selected_story = data["Sport"]["Easy"];

// - - - INPUT PAGE - - -

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
  [blank_list, blank_story] = findBlankWords(demo_selected_story);
  input_words_html = ''
  for (let word of blank_list) {
    input_words_html += '<label for="fname">'+word+':</label><input type="text" id="fname" name="fname"><br><br></br> '
  }
  document.getElementById("input_words").innerHTML = input_words_html;
}