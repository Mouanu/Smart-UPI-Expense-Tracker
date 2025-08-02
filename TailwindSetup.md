## How to set up tailwindcss

step-1 :
     ```npm install -D tailwindcss@3 postcss autoprefixer ```

    ``` npx tailwindcss init -p```

     the above will create node.js project

step-2 :
        Update tailwind.config.js file to include this line:

        /** @type {import('tailwindcss').Config} */

             ```   export default {
                content: [
                "./index.html",
                "./src/**/*.{js,ts,jsx,tsx}",
                ],
                theme: {
                extend: {},
                },
                plugins: [],```
}

step-3 :
        create src/input.css to inlcude
        ```@tailwind base;
            @tailwind components;
            @tailwind utilities;
            ```
step-4 :

        Include the output.css file to your input.html file
        like this: 
        href="src/output.css"

step-5 :
        Run the following command

      ```  npx tailwindcss -i ./src/input.css -o ./src/output.css --watch ```


