FROM continuumio/anaconda

RUN conda create -v -n webaz -c conda-forge -y yarn python=3.6 twisted gcc

RUN sed -i 's/base/webaz/' ~/.bashrc

RUN mkdir /src

COPY requirements.txt package.json /src/

#RUN . activate webaz && \
#    pip install -r /src/requirements.txt && \
#    cd src && yarn install
