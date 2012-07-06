class Metro
  (bpm) ->
    @bpm = bpm or 120

    @msec = timbre.utils.bpm2msec @bpm, 4
    @_m = no
    @_funcs =
      '_click_': !(i) ->
        cnt = i.count%4
        vol = 0.5
        if @_m then
          if cnt is 0 then @click 880, vol else @click 440, vol

    @loopFunc = !->
      for k,v of @_funcs
        if typeof v is "function" then v.apply @, [interval]

    interval = @interval = T "interval", @msec, @loopFunc.bind @

  add: !(k,fn)->
    @_funcs[k] = fn

  fnames: -> [k for k,v of @_funcs]
    
  remove: (k)->
    _f = @fnames!
    if k in _f then delete @_funcs[k]
    @fnames!

  run: !->
    @interval.on!

  stop: !->
    @interval.off!

  click: !(freq,vol) ->
    osc = T "pulse",freq
    env = T "perc" 80 .set("mul",vol)
    s = T "*" osc, env.bang! .play!
    s.onendec = ! ->
      s.pause!

  clickOn: ! -> @_m = true
  clickOff: ! -> @_m = false

