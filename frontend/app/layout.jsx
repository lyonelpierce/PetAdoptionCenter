import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Pawsome | Your Pet Adoption Center",
  description: "Adopt a pet today!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          <main>
            <div className="container mx-auto flex">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
