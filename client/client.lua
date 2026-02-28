local isUiOpen = false
local ESX = exports["es_extended"]:getSharedObject()
local function setUiVisible(visible)
  isUiOpen = visible
  SetNuiFocus(visible, visible)
  SendNUIMessage({
    action = 'setVisible',
    data = visible,
  })
end

RegisterCommand('showui', function()
  setUiVisible(true)

  SendNUIMessage({
    action = 'setLocale',
    data = {
      ui_playerMoney = 'Player Money',
      ui_buttonText = 'Get Player Money',
      ui_reset = 'Reset',
    },
  })
end, false)

RegisterNUICallback('hide-ui', function(_, cb)
  setUiVisible(false)
  cb({ ok = true })
end)

RegisterNUICallback('getPlayerMoney', function(_, cb)
  local ped = PlayerPedId()
  local playerId = PlayerId()
  local money = ESX.PlayerData.money
  cb(money)
end)

RegisterNUICallback('loadLocale', function(_, cb)
  cb({ ok = true })
end)

AddEventHandler('onResourceStop', function(resource)
  if resource ~= GetCurrentResourceName() then
    return
  end

  if isUiOpen then
    SetNuiFocus(false, false)
  end
end)
