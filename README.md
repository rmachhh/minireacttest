React Mini Take Home Test

Setup:

1. to run the project you would need to install the packages.
2. run "npm install" to install all necessary packages.
3. after installation, run the project using "npm run dev"
4. Make sure to be in the project root directory where "src" folder is located.

Prerequisites:

1. Node

Testing:

1. run "npm run test"

What would improve:

1. API based or server-side pagination if it is allowed by the api that we are fetching from this will reduce the amount of data pass to the client if what we only need is 30, since currently we handle it using slice and it still gathers the whole data from the server.

2. i would replace the usePosts hook logic with tanstack query for better cache management, polling, and automatic retries.

3. Virtualization so that if the lists grow from 30 to 30,000 it will only render 5-10 items currently visible in the viewport, minimizing lags and will guarantee a smooth experience.
