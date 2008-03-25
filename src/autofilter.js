var Autofilter = Class.create({
  initialize: function(element, option_container) {
    this.element = $(element);
    this.option_container = $(option_container);
    this.option_elements = this.option_container.childElements();
    
    this.not_found_element = this.create_not_found_element();
    this.option_container.insert(this.not_found_element);
    
    Event.observe(this.element, 'keyup', this.filter_options.bindAsEventListener(this));
  },
  
  filter_options: function() {
    var input = this.element.value;
    
    split_options = this.option_elements.partition(function(n){
      var descendants = n.descendants();
      
      if(descendants.size() > 0){
        return descendants.any(function(d){
          if(d.descendants().size() == 0){
            return d.innerHTML.match(new RegExp(input, "i"));
          }else{
            return false;
          }
        });
      }else{
        return n.innerHTML.match(new RegExp(input, "i"));
      }
    });
    
    split_options[1].invoke('hide');
    split_options[0].invoke('show');
    split_options[0].size() > 0 ? this.not_found_element.hide() : this.not_found_element.show();
  },
  
  create_not_found_element: function() {
    var not_found = document.createElement(this.option_container.tagName.toLowerCase() == 'ul' ? 'li' : 'div');
    not_found.addClassName('not_found');
    not_found.appendChild(document.createTextNode('Not found'));
    not_found.hide();
    
    return not_found;
  }
});