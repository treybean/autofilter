var Autofilter = Class.create({
  initialize: function(element, option_container) {
    this.element = $(element);
    this.option_container = $(option_container);
    this.option_elements = this.option_container.childElements();
    
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
  }
});