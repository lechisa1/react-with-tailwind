const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-5 fixed bottom-0 w-full">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="ml-30 text-center">© 2023 Modern Dashboard. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;