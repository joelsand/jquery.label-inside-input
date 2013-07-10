jquery.label-inside-input
=========================

jQuery plugin - Places a label inside a text input field, and a tooltip on the side when focused.


Basic Example
-------------

1. Include jQuery, of course.

   ```html
   <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
   ```

2. Include both the css, and the js file.

   ```html
   <link type="text/css" rel="stylesheet" href="jquery.label-inside-input.css" />
   <script type="text/javascript" src="jquery.label-inside-input.js"></script>
   ```

3. Initialize with script.

   ```html
   <script type="text/javascript">
       $(function () {
           $('#example-a input[type=text]').labelInsideInput({
               tooltipPosition: 'right'
           });
       });
   </script>
   ```

4. Your HTML structure should look something like this.  By default, the text of the label is retrieve by including the text and input field inside a ```<label>``` tag.

   ```html
   <form action="foobar.html" method="post" id="example-a">
       <label>
           First Name
           <input type="text" name="FirstName" />
       </label>
       <br />
       <label>
           Last Name
           <input type="text" name="LastName" />
       </label>
       <br />
       <label>
           Favorite Color
           <input type="text" name="FavoriteColor" value="Blue" />
       </label>
       <br />
       <input type="submit" value="Submit" />
   </form>
   ```
