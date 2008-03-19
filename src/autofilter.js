var Autofilter = Class.create({
  initialize: function(element, option_container) {
    this.element = $(element);
    this.option_container = $(option_container);
    this.option_elements = this.option_container.childElements();
    
    Event.observe(this.element, 'keydown', this.filter_options.bindAsEventListener(this));
  },
  
  filter_options: function() {
    var input = this.element;
    split_options = this.option_elements.partition(function(n){
      return n.innerHTML.match(new RegExp(input.value, "i"));// == null ? false : true;
    });
    
    split_options[1].invoke('hide');
    split_options[0].invoke('show');
  }
});