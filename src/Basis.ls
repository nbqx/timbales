Basis =
  genLoopFn: (name) ->
    !(bpm) ->
      bpm = bpm or metro.bpm
      seq = @[name] || []

      fn = ([x,...xs]:list) ->
        dur = if x[0] instanceof Array
        then dur = (timbre.utils.bpm2msec bpm, x[0][0]) * x[0][1]
        else dur = timbre.utils.bpm2msec bpm, x[0]

        tmr = T "timeout" dur, !->
          if xs.length isnt 0 then fn xs  
        tmr.on!
        
        x[1].apply @, x[2]

      if seq.length isnt 0 then fn seq
