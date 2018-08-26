# Speedtest

This app brings speedtest to Homey. 

Trigger speedtest "manually" via flow action, or configure an interval in the app settings page.

#####Flow trigger cards:
- Speedtest complete - tags:
    - Download speed (mbps)
    - Download speed difference from last result (percentage)
    - Upload speed (mbps)
    - Upload speed difference from last result (percentage)
- Speedtest failed

#####Flow action cards:
- Run speedtest


## Release notes

#### 0.0.2
- Fixed "Speedtest complete" flow trigger did not go through

#### 0.0.1
- Initial version

## N.B.
Remember! The wireless connection between your Homey and your access point is very likely to be a bottleneck, and the results from speedtest running on the Homey will not necessarily reflect the routers connection speed.

## Disclaimer 
Running the speed test is a bit CPU heavy for the Homey, so I cannot guarantee it will not affect general performance while the speed test is in progress.