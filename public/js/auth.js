// Check if user is logged in
function checkLogin() {
  const user = localStorage.getItem("user");
  const currentPage = window.location.pathname;
  
  // Pages that don't require login
  const publicPages = ['/user-login.html', '/register.html', '/admin-login.html'];
  
  // Check if current page is public
  const isPublicPage = publicPages.some(page => currentPage.includes(page));
  
  // If not logged in and not on public page, redirect to login
  if (!user && !isPublicPage) {
    window.location.href = 'user-login.html';
  }
}

// Run check on page load
checkLogin();