// smsService.js
export const sendSMS = async (to, message) => {
    try {
      const response = await fetch('http://192.168.86.34:3000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: to,
          message: message,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('SMS sent successfully:', data.messageSid);
      } else {
        console.log('Failed to send SMS:', data.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  