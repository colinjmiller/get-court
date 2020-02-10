# Get a Downtown Seattle YMCA court!

The use case for this is very specific: Racquetball/Squash players who want to reserve the optimal court time at the downtown YMCA in Seattle, WA.

Still here? Nice.

## Installing

- Ensure [node](https://nodejs.org/en/) is installed.
- `git clone git@github.com:colinjmiller/get-court.git`

## Usage

The script will login via the [activecommunities.com](https://apm.activecommunities.com/seattleymca/ActiveNet_Login?function=onlinequickfacilityreserve&aui_color_theme=theme_black&enable_reskin=&function_text=To%20Online%20Quick%20Reservation&sessionId=j0kib00716o9si6h2uf6mo3b&ga_ga_account=UA-1247608-1&global_multi_fund_enabled=&ams_order_descriptor=YMCA%20of%20Greater%20Seattle&server_host_address=prod-activenet-76w.an.active.tan&rno=2&ga_google_tag_manager=True&js_ams_order_descriptor=YMCA%20of%20Greater%20Seattle&FOR_CUI=True&sdireqauth=1581306196044&js_calendars_label=Calendars&ga_ga_container=GTM-PWTBMFK&CUI_CONSUMER=true&calendars_label=Calendars) login page, so you'll need account credentials there. You provide these via arguments to the script along with the day you want to claim the court. For example:

```
$ node ./register.js --email=example@example.com --password=123456luggage --day=15
```

This will try to login with that username and password (and fail in this case because they're fake credentials, but you knew that already) and then select the 15th of the month. Once selected, it'll grab the 5 - 6PM slot on court 1 (or court 2 if someone beats you to it somehow).

This is all fine and good if you run it manually, but since court registrations open up at 4 AM you probably want to be asleep and have this script run itself. Which brings us to...

## Running it automatically

Despite my unix prompt above, I'm actually running this on Windows. If you have a mac or a flavor of linux, it would probably be easiest to [set up a cron job for this](https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html). If you're like me, I'm using Windows' [Task Scheduler](https://www.howtogeek.com/123393/how-to-automatically-run-programs-and-set-reminders-with-the-windows-task-scheduler/), which I didn't know existed until I made this project.

Open up the Task Scheduler and click the `Create Task...` item in the actions menu. You'll be prompted for a name--give it something meaningful that it won't be ashamed of when it goes to Elementary school and beyond. On the triggers menu, click `New...`. You'll want a one-time task that runs the following morning at 4:01 AM (or 4:00 AM if you're feeling bold!) Back in the task, click the actions menu and click `New...`. The action you want is `Start a program`, and you'll need to enter the path to your `node.exe` file. In the arguments portion, add the absolute path to this project's `register.js` file and the email, password, and day. Then sit tight and hope it all works!