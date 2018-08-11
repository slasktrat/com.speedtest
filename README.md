# Speedtest

This app brings speedtest to Homey. 

Trigger speedtest "manually" via flow action, or configure a interval in the app settings page.

#####Flow trigger cards:
- Speedtest complete - tags:
    - Download speed (mbps)
    - Download speed difference from last result (percentage)
    - Upload speed (mbps)
    - Upload speed difference from last result (percentage)

#####Flow action cards:
- Run speedtest

## N.B.
Remember! The wireless connection between your Homey and your access point is very likely to be a bottleneck, and the results from speedtest running on the Homey will not necessarily reflect the routers connection speed.

## Disclaimer 
Running the speed test is a bit CPU heavy for the Homey, so I cannot guarantee it will not affect general performance while the speed test is in progress.