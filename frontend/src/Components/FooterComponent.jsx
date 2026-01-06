function FooterComponent() {
  return (
    <footer className="dark:bg-gray-800 dark:text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} UBlog. All rights reserved.</p>
      <p>Made by Ashish</p>
    </footer>
  );
}

export default FooterComponent;
