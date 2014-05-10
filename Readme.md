Getting json data
=================

https://github.com/mbostock/topojson/wiki/Command-Line-Reference
http://gis.stackexchange.com/questions/80525/how-to-convert-cartesian-to-lat-lon-with-topojson
http://161.111.170.202/herb/countrycodes.html
https://gist.github.com/mbostock/5557726
http://bost.ocks.org/mike/map/
http://bl.ocks.org/kobben/5932448

            +
        ISO 3166:
A2    A3     Number Cuntry
IL    ISR    376    ISRAEL


ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('ISR')" -s_srs EPSG:26986 -t_srs EPSG:4326  subunits.json ne_10m_admin_0_map_subunits.shp

ogr2ogr -f GeoJSON -where "ISO_A2 = 'IL' AND SCALERANK < 8" -s_srs EPSG:26986 -t_srs EPSG:4326 places.json ne_10m_populated_places.shp

topojson -o isr.json --width 960 --height 1160 --id-property SU_A3 --properties name=NAME --cartesian subunits.json places.json
