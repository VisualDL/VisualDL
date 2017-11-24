protobuf_generate_cpp(PROTO_SRCS PROTO_HDRS storage.proto)
add_library(storage storage.cc ${PROTO_SRCS} ${PROTO_HDRS})
