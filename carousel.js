$.fn.greenify = function() {
    this.css( "color", "green" );
    return this;
}
 
$( "a" ).greenify().addClass( "greenified" );