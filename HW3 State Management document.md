**HW3 -- State Management**

**Various States an App Can Enter on iOS Platform with React Native:**

**Active State:**

-   The app is currently in the foreground and actively being used by
    the user.

-   User interactions and updates are occurring in real-time.

-   UI elements are visible and responsive.

**Inactive State:**

-   The app is in the foreground but not receiving events, typically
    because the system is transitioning the app to a different state.

-   Examples include when an incoming call or SMS message arrives, or
    when the user pulls down the notification center.

**Background State:**

-   The app is running in the background, but it is not currently
    executing code.

-   Limited background tasks, such as audio playback, location updates,
    or background fetch, may continue.

-   The app may be suspended by the system at any time to free up
    resources.

**Suspended State:**

-   The app is in the background but is not executing code.

-   It may be removed from memory by the system to reclaim resources.

-   Upon returning to the foreground, the app will typically be
    reinitialized to its last known state.

**Various States to Consider for the Medilink App:**

**Active State:**

-   The user is actively using the app to view medications, schedule
    deliveries, or track medication status.

-   Real-time updates and notifications should be provided for any
    changes or alerts.

**Inactive State:**

-   The app may enter this state when the user receives a phone call,
    SMS, or other system notifications.

-   It should gracefully handle interruptions and ensure that the
    user\'s data and state are preserved when returning to the app.

**Background State:**

-   When the app is in the background, it may need to continue
    monitoring for updates, such as new prescription uploads or delivery
    status changes.

-   Background tasks may include fetching updated data, sending
    notifications, or updating the app badge icon.

**Suspended State:**

-   If the app is suspended by the system, it should save any unsaved
    data and state to ensure a seamless user experience when the app is
    reopened.

-   It should resume from where the user left off, without losing any
    data or progress.

**Offline State:**

-   The app should handle scenarios where the device is offline,
    ensuring that critical functionalities, such as accessing
    prescription history or scheduling deliveries, remain available.

-   Offline storage and synchronization mechanisms can help maintain app
    functionality even without an internet connection.

**Error State:**

-   The app should gracefully handle errors, such as network failures or
    server issues, and provide appropriate error messages or guidance to
    the user.

-   Users should be informed of any errors encountered and guided on how
    to resolve them, if possible.
