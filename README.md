![SheetLibrary App](https://i.imgur.com/hj14kGb.png)

Welcome to the **SheetLibrary App**! This React application is designed to provide a seamless and interactive experience for managing and exploring your sheet data. Built with modern web technologies, it connects effortlessly to our [Custom REST API](https://github.com/KDominikk00/SheetLibrary-REST-API) to deliver dynamic and responsive functionality.

Home Page           |  0Auth Sign in Page
:-------------------------:|:-------------------------:
![Home Page](https://gcdnb.pbrd.co/images/1Pz19hbTHALU.png?o=1) |  ![0Auth Sign in](https://gcdnb.pbrd.co/images/btE9kJfIXzY5.png?o=1)



## Features

- **Interactive User Interface**: Intuitive design for an engaging user experience.
- **Custom API Integration**: Seamless connection to a custom REST API for data management.
- **Dynamic Data Handling**: Efficiently handle and display sheet data with real-time updates.
- **Search and Filter**: Quickly find and organize your sheet data with powerful search and filter options.
- **Responsive Design**: Fully functional across various devices and screen sizes.

## Getting Started

To get started with the SheetLibrary App, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine. [Download Node.js](https://nodejs.org/).
- Make sure you download and configure the custom REST API created for this app [SheetLibrary REST API](https://github.com/KDominikk00/SheetLibrary-REST-API)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KDominikk00/SheetLibrary-app.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd SheetLibrary-app
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Development Server**

   ```bash
   npm start
   ```

   This will start the development server and open the app in your default web browser.

### Configuration

Ensure that your environment is set up to connect to the custom REST API. You can configure the API endpoint in the `.env` file located in the root directory of the project:

```env
REACT_APP_API_URL=https://github.com/KDominikk00/SheetLibrary-REST-API
