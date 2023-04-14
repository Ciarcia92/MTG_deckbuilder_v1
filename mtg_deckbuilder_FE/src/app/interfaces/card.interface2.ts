export interface CardInterface2 {
 "object": string,
  "id": string,
  "oracle_id": string,
  "multiverse_ids": [
  number
  ],
"arena_id": number,
"name": string,
"lang": string,
"released_at": string,
"uri": string,
"scryfall_uri": string,
"layout": string,
"highres_image": boolean,
"image_status": string,
"cmc": number,
"type_line": string,
"color_identity": [
string
],
"keywords": [
  string,
  string
],
"card_faces": [
{
"object": string,
"name": string,
"mana_cost": string,
"type_line": string,
"oracle_text": string,
"colors": [
  string
],
"power": string,
"toughness": string,
"artist": string,
"artist_id": string,
"illustration_id": string,
"image_uris": {
"small": string,
"normal": string,
"large": string,
"png": string,
"art_crop": string,
"border_crop":string
}
},
{
"object":string,
"name":string,
"flavor_name":string,
"mana_cost":string,
"type_line":string,
"oracle_text":string,
"colors": string[],
"power":string,
"toughness":string,
"artist":string,
"artist_id":string,
"illustration_id":string,
"image_uris": {
"small": string,
"normal": string,
"large": string,
"png": string,
"art_crop": string,
"border_crop": string,
}
}
],
"all_parts": [
{
"object": string,
"id": string,
"component": string,
"name": string,
"type_line": string,
"uri": string,
},
{
"object": string,
"id": string,
"component": string,
"name": string,
"type_line": string,
"uri": string,
}
],
"legalities": {
"standard": string,
"future": string,
"historic": string,
"gladiator": string,
"pioneer": string,
"explorer": string,
"modern": string,
"legacy": string,
"pauper": string,
"vintage": string,
"penny": string,
"commander": string,
"oathbreaker": string,
"brawl": string,
"historicbrawl": string,
"alchemy": string,
"paupercommander": string,
"duel": string,
"oldschool": string,
"premodern": string,
"predh":string,
},
"games": string[],
"reserved": boolean,
"foil": boolean,
"nonfoil": boolean,
"finishes": [
  string
],
"oversized": string,
"promo": string,
"reprint": string,
"variation": string,
"set_id": string,
"set": string,
"set_name": string,
"set_type": string,
"set_uri": string,
"set_search_uri": string,
"scryfall_set_uri": string,
"rulings_uri": string,
"prints_search_uri": string,
"collector_number": string,
"digital": string,
"rarity": string,
"artist": string,
"artist_ids": [
string,
],
"border_color": string,
"frame": string,
"security_stamp": string,
"full_art": string,
"textless": string,
"booster": string,
"story_spotlight": string,
"promo_types": [
  string,
  string
],
"prices": {
"usd": string,
"usd_foil": string,
"usd_etched": string,
"eur": string,
"eur_foil": string,
"tix": string,
},
"related_uris": {
"tcgplayer_infinite_articles": string,
"tcgplayer_infinite_decks": string,
"edhrec": string
}
}
