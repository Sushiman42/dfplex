FROM ubuntu:20.04

# Pre install
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update

RUN apt-get -y install --no-install-recommends screen build-essential libsdl1.2debian libsdl-image1.2 libsdl-ttf2.0-0 libopenal1 libsndfile1 libgtk2.0-0 libncursesw5 libglu1 unzip curl libboost-all-dev bzip2

ENV DEBIAN_FRONTEND=dialog

ADD http://www.bay12games.com/dwarves/df_47_04_linux.tar.bz2 df.tar.bz2
ADD https://github.com/white-rabbit-dfplex/dfplex/releases/download/v0.2.1-dfplex/dfplex-v0.2.1-linux64.zip dfplex.zip
ADD https://github.com/DFHack/dfhack/releases/download/0.47.04-r1/dfhack-0.47.04-r1-Linux-64bit-gcc-4.8.tar.bz2 dfhack.tar.bz2
RUN tar xfj df.tar.bz2 && rm df.tar.bz2
RUN tar xfj dfhack.tar.bz2 -C /df_linux && rm dfhack.tar.bz2
RUN unzip dfplex.zip && rm dfplex.zip && cp -r dfplex-v0.2.1-Linux64/* df_linux/ && rm -rf dfplex-v0.2.1-Linux64/
RUN echo "\n[PRINT_MODE:TEXT]\n[INTRO:NO]\n[TRUETYPE:NO]\n[SOUND:NO]" >> /df_linux/data/init/init.txt
RUN echo "\n[BIRTH_CITIZEN:A_D:D_D]\n[MOOD_BUILDING_CLAIMED:A_D:D_D]\n[ARTIFACT_BEGUN:A_D:D_D]" >> /df_linux/data/init/announcements.txt
EXPOSE 8000
EXPOSE 5000
EXPOSE 1234

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
