#!/usr/bin/env bash

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Esperando que $host:$port esté disponible..."
  sleep 2
done

exec $cmd
