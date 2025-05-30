
### Bắt đầu quá trình build với máy chủ node (tự động pull image node:20 từ docker hub khi build image)

FROM node:20 AS build
# Tạo thư mục gốc, đặt tên cho nó là app (WORKDIR = app)
# Các lệnh sẽ được chạy tại đường dẫn /app
WORKDIR /app

# Sao chép file package.json hoặc package-lock.json vào thư mục /app
COPY package*.json ./

# sau khi thêm package.json,
# cài đặt node modules ngay trong /app
RUN npm install

# Copy toàn bộ source vào /app (trử các file trong dockerfile.ignore)
COPY . .

# Chạy ứng dụng để tạo các file dist ...
RUN npm run build

# Chúng ta có được sản phẩm đầu ra (artifact)

### Bắt đầu quá trình run time với máy chủ nginx (tự động pull image nginx:1.25.1 từ docker hub khi)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]