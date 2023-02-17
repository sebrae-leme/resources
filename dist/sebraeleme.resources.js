'use strict';

tinybind.binders.autocomplete = {
  bind: function bind(el, values) {},

  unbind: function unbind(el) {
    this.autocompleteInstance.destroy();
  },

  routine: function routine(el, values) {

    if (this.autocompleteInstance) {
      this.autocompleteInstance.destroy();
    }

    this.autocompleteInstance = FLUIGC.autocomplete(el, {
      highlight: true,
      minLength: 0,
      maxTags: 1,
      hint: true,
      searchTimeout: 100,
      type: $(el).attr('ac-type') || 'tagAutocomplete',
      tagClass: $(el).attr('ac-tag-class') || 'tag-info',
      displayKey: $(el).attr('ac-display-key'),
      templates: {
        tag: $(el).attr('ac-tag-template'),
        suggestion: $(el).attr('ac-tag-template')
      },
      source: substringMatcher(values, $(el).attr('ac-display-key'))
    }, function (err, data) {
      if (err) {
        try {
          errMessage = JSON.parse(err.responseText.message);
          errMessage = errMessage.message ? err.responseText.message : err.responseText;
        } catch (e) {
          errMessage = 'Não foi possível listar os dados';
        }
        FLUIGC.toast({
          message: errMessage,
          type: 'danger'
        });
      }
    });

    this.autocompleteInstance.on('fluig.autocomplete.itemAdded', this.publish);
  }
};

itemAdded = function itemAdded(ev, el) {
  console.log(ev, el);
  undefined.dispatchEvent(new CustomEvent('itemchanged', { 'item': ev.item }));

  // new CustomEvent('itemchanged', { 'item': el.item })
};
substringMatcher = function substringMatcher(strs, name) {

  return function findMatches(q, cb) {
    var matches, substrRegex;

    matches = [];

    substrRegex = new RegExp(q, 'i');

    $.each(strs, function (i, str) {
      if (substrRegex.test(str[name])) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};
;tinybind.formatters.and = function (comparee, comparator) {
  return comparee && comparator;
};;tinybind.configure({

  // Attribute prefix in templates
  prefix: 'lm',

  // Preload templates with initial data on bind
  preloadData: true,

  // Root sightglass interface for keypaths
  rootInterface: '.',

  // Template delimiters for text bindings
  templateDelimiters: ['{', '}'],

  // Augment the event handler of the on-* binder
  handler: function handler(target, event, binding) {
    this.call(target, event, binding.view.models);
  }

});
//# sourceMappingURL=sebraeleme.resources.js.map
