let auth0 = null;

async function configureAuth0() {
    auth0 = await createAuth0Client({
        domain: 'dev-o8yqwklfffu8cdcy.us.auth0.com', // Replace with your Auth0 domain
        client_id: '00uiu33nFzDShiLGijzBfAJlkL7eSmxw',
        redirect_uri: window.location.origin,
        cacheLocation: 'localstorage'
    });

    // Check if the user is authenticated
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        console.log("User is authenticated");
        // Optionally, update UI or fetch user profile
    } else {
        console.log("User is not authenticated");
    }

    // Handle the authentication callback
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
        // After handling redirect, check authentication status again
        if (await auth0.isAuthenticated()) {
            console.log("User is authenticated after redirect");
            // Optionally, update UI or fetch user profile
        }
    }
}

async function configureAuth0() {
    auth0 = await createAuth0Client({
        domain: 'dev-o8yqwklfffu8cdcy.us.auth0.com', // Replace with your Auth0 domain
        client_id: '00uiu33nFzDShiLGijzBfAJlkL7eSmxw',
        redirect_uri: window.location.origin,
        cacheLocation: 'localstorage'
    });

    // Check if the user is authenticated
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        console.log("User is authenticated");
        // Optionally, update UI or fetch user profile
        // Redirect to a new page, e.g., user dashboard
        window.location.href = '/dashboard.html'; // Adjust the URL as needed
    } else {
        console.log("User is not authenticated");
        // Handle the authentication callback
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
            // After handling redirect, check authentication status again
            if (await auth0.isAuthenticated()) {
                console.log("User is authenticated after redirect");
                // Optionally, update UI or fetch user profile
                // Redirect to a new page, e.g., user dashboard
                window.location.href = '/dashboard.html'; // Adjust the URL as needed
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    configureAuth0();

    // Event listener for login action
    document.querySelectorAll('.login-button').forEach(button => {
        button.addEventListener('click', () => {
            auth0.loginWithRedirect();
        });
    });

    // Event listener for logout action
    document.querySelectorAll('.logout-button').forEach(button => {
        button.addEventListener('click', () => {
            auth0.logout({
                returnTo: window.location.origin
            });
        });
    });

    // Initialize tabs - Keep this if you still need tab functionality
    var $tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs li'), 0);
    var $tabContents = Array.prototype.slice.call(document.querySelectorAll('.tab-content'), 0);

    if ($tabs.length > 0) {
        $tabs.forEach(function ($tab) {
            $tab.addEventListener('click', function () {
                $tabs.forEach(function ($tab) {
                    $tab.classList.remove('is-active');
                });
                $tabContents.forEach(function ($content) {
                    $content.classList.remove('is-active');
                });
                $tab.classList.add('is-active');
                document.getElementById($tab.dataset.tab).classList.add('is-active');
            });
        });
    }
});