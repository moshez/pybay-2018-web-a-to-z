#!/bin/sh
exec /opt/pybay/webaz/venv-webaz/bin/python -m twisted \
    ncolony \
    --messages /opt/pybay/webaz/run/ncolony/messages/ \
    --config /opt/pybay/webaz/run/ncolony/config/

