use axum::{
    routing::{get,post},
    http::{StatusCode, HeaderValue, Method},
    Router,
    response::IntoResponse,
    extract::Json,
    response::Json as AxumJson,
};
use serde_derive::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::RwLock;
use tower_http::cors::{CorsLayer, Origin};



#[derive(Deserialize, Serialize, Debug, Clone)]
struct Item {
    name: String,
    description: String,
    price: f64,
    merchant_name: String,
}

#[derive(Clone)]
struct  AppData{
    items: Arc<RwLock<Vec<Item>>>,
}

#[tokio::main]
async fn main() {
    let data = AppData{
        items: Arc::new(RwLock::new(Vec::new())),
    };

    let cors = CorsLayer::new()
        .allow_methods(vec![Method::GET, Method::POST, Method::OPTIONS])
        .allow_origin(Origin::exact(HeaderValue::from_static("http://localhost:5173")))
        .allow_headers(vec![http::header::CONTENT_TYPE]) 
        .allow_credentials(true);

    let app = Router::new()
    .route("/adicionar-item", post(add_item))
    .route("/itens-a-venda", get(list_items))
    .layer(cors)
    .layer(axum::AddExtensionLayer::new(data));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Server is running on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn add_item(
    Json(item): Json<Item>,
    data: axum::extract::Extension<AppData>
) -> impl IntoResponse {
    println!("Item adicionado {:?}", item);
    data.items.write().await.push(item);
    (StatusCode::OK, "Item added successfully!")
}

async fn list_items(
    data: axum::extract::Extension<AppData>,
) -> impl IntoResponse {
    let items = data.items.read().await;
    AxumJson(items.clone())
}