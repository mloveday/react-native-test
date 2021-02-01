# react-native-test
Trying out React Native, port of interview-task-3 to mobile

## Requirements
- Install Node
- Install yarn
- run `yarn install`
- add a file, `./do-not-commit/client-details.json`, containing client id and secret from the [spotify developer dashboard](https://developer.spotify.com/dashboard/login):
```json
{
  "id": "id from spotify",
  "secret": "secret from spotify"
}
```

## Running the project
- run `yarn start`
    - Follow the instructions to open the app
  
## Notes

- This is a quick (~2 hours tops, between childcare duties) and dirty port of `mloveday/interview-task-3`. The same notes from that repo affect this one, i.e. it's much more a proof of concept than production-ready.
- Styling is about as basic as I could get away with, i.e. it works rather than it is pretty. It's a technical exercise rather than a full-blown example of what I can do.
- I've only tested it on ios
- I used expo, as it seemed the quickest way to get cracking

## Future features
Time permitting...
- open links in spotify app
- clear search
- separate out state from one object, probably use redux toolkit instead at the same time
- tests! Stripped out when porting for dev speed given the small project size.