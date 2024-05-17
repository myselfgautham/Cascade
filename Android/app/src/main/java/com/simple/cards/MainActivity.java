package com.simple.cards;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.webkit.WebSettings;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    WebView buffer;
    String WebSiteAddress = "http://192.168.43.189:1920";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView.setWebContentsDebuggingEnabled(true);
        buffer = findViewById(R.id.Website);
        WebSettings settings = buffer.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        buffer.setWebViewClient(new WebViewClient());
        buffer.setScrollContainer(false);
        buffer.loadUrl(WebSiteAddress);
    }
}